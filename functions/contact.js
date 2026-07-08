export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // Parse incoming content type
        const contentType = request.headers.get("content-type") || "";
        let body = {};
        
        if (contentType.includes("application/json")) {
            body = await request.json();
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await request.formData();
            for (const [key, value] of formData.entries()) {
                body[key] = value;
            }
        } else {
            return new Response(JSON.stringify({ error: "Unsupported Content-Type" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { name, email, company, message, lang } = body;

        // Basic validation
        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Name, email, and message are required fields." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Configure environment values
        const resendApiKey = env.RESEND_API_KEY;
        const toEmail = env.CONTACT_TO_EMAIL || "hello@veridatapro.com";
        const fromEmail = env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

        if (!resendApiKey) {
            console.error("Missing RESEND_API_KEY environment variable.");
            return new Response(JSON.stringify({ error: "Server configuration error. Please configure RESEND_API_KEY." }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Build Resend email request body
        const emailPayload = {
            from: `Veridata Pro Form <${fromEmail}>`,
            to: [toEmail],
            reply_to: `${name} <${email}>`,
            subject: `New Contact Submission [${lang ? lang.toUpperCase() : 'EN'}] - ${name}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 4px;">
                    <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0; color: #111;">New Contact Submission</h2>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p style="margin: 10px 0;"><strong>Company:</strong> ${company || "Not provided"}</p>
                    <p style="margin: 10px 0;"><strong>Language context:</strong> ${lang ? lang.toUpperCase() : "EN"}</p>
                    <p style="margin: 20px 0 5px 0;"><strong>Message:</strong></p>
                    <div style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; font-size: 0.95em;">${message}</div>
                </div>
            `
        };

        // Fire request to Resend API
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emailPayload)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("Resend API error:", errText);
            return new Response(JSON.stringify({ error: "Failed to send email via provider." }), {
                status: 502,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ success: true, message: "Message sent successfully!" }), {
            status: 200,
            headers: { 
                "Content-Type": "application/json"
            }
        });

    } catch (err) {
        console.error("Internal processing error:", err);
        return new Response(JSON.stringify({ error: "Internal server error." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

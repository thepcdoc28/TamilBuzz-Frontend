import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./StaticPage.css";
import ExitToMenuButton from "../../components/ExitToMenuButton/ExitToMenuButton";

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message! Our team will get back to you shortly.");
        e.target.reset();
    };

    return (
        <>
            <Navbar />
            <div className="static-page">
                <ExitToMenuButton />
                <h1>Contact Us</h1>
                <p>
                    Have a question, feedback, or a business inquiry? We'd love to hear from you. Fill out the form below and we'll get in touch as soon as possible.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email Address" required />
                    <textarea placeholder="How can we help you?" required></textarea>
                    <button type="submit">Send Message</button>
                </form>

                <h2>Other ways to reach us</h2>
                <p>Email: support@tamilbuzz.app</p>
                <p>Twitter: @TamilBuzzApp</p>
            </div>
            <Footer />
        </>
    );
}

export default Contact;

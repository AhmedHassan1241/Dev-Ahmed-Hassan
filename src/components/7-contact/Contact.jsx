import { useForm, ValidationError } from "@formspree/react";
import "./contact.css";
import Lottie from "lottie-react";
import doneAnimation from '../../animation/developer.json'
import contactAnimation from '../../animation/contact.json'
const Contact = () => {
    const [state, handleSubmit] = useForm("xrbgkbdl");
   
  return (
    <section className="contact-us" id={"contact-us"}>
      <h1 className="title">
        <span className="icon-envelope"></span>
        Contact Me
      </h1>
      <p className="sub-title">
        Contact me for more information and Get notified when i publish
        something new{" "}
      </p>
      <div style={{justifyContent:"space-between",alignItems:"start",flexWrap:"wrap-reverse"}} className="contactSection flex">
        <form action="" onSubmit={handleSubmit} className="">
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input
            autoComplete="off"
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              required
            />
             <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
          </div>

          <div className="flex" style={{marginTop:"24px"}}>
            <label htmlFor="message">Your Message:</label>
            <textarea name="message" id="message" placeholder="Message" required></textarea>
            <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
          </div>

          <button className="submit" type="submit" disabled={state.submitting}>{state.submitting?"Submitting...":"Submit"}</button>
        {state.succeeded &&( 
         <p className="emailMessage flex">
          <Lottie loop={false} style={{height:70,width:70,}} animationData={doneAnimation} />
          Your message has sent successfully👌
          </p>
    )}
        </form>
        <div className="contact-animation">
        <Lottie style={{height:300,width:300}} animationData={contactAnimation} />

        </div>
      </div>
    </section>
  );
};

export default Contact;

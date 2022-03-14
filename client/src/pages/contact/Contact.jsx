import React,{useRef} from 'react'
import emailjs from 'emailjs-com'
import "./style.css"
import Swal from 'sweetalert2'
import Email from "./email.png"
const Contact = () => {
  const form = useRef();
   function sendEmail(e) {
       e.preventDefault();
      emailjs.sendForm('gmail', 'template_8122sfp', e.target, 'c4eSMKguRw5Tfy_tH')
     .then((result) => {
       console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      Swal.fire('Message sended', '', 'success')
      e.target.reset()
}
  return (
    <>
  
      <div className="container-contact100">
		<div className="contact100-map" id="google_map" data-map-x="40.722047" data-map-y="-73.986422" data-pin="images/icons/map-marker.png" data-scrollwhell="0" data-draggable="1"></div>

		<div className="wrap-contact100">
			<span className="contact100-form-symbol">
				<img src={Email} alt="SYMBOL-MAIL"/>
			</span>

			<form  ref={form} onSubmit={sendEmail} className="contact100-form validate-form flex-sb flex-w">
				<span className="contact100-form-title">
					Drop Us A Message
				</span>

				<div className="wrap-input100 rs1 validate-input" data-validate = "Name is required">
					<input className="input100" type="text" name="name" required placeholder="Name"/>
					<span className="focus-input100"></span>
				</div>

				<div className="wrap-input100 rs1 validate-input" data-validate = "Email is required: e@a.z">
					<input className="input100" type="text" name="email" required placeholder="Email Address"/>
					<span className="focus-input100"></span>
				</div>

				<div className="wrap-input100 validate-input" data-validate = "Message is required">
					<textarea className="input100" name="message" required placeholder="Write Us A Message"></textarea>
					<span className="focus-input100"></span>
				</div>

				<div className="container-contact100-form-btn">
					<button className="contact100-form-btn">
						Send
					</button>
				</div>
			</form>
		</div>
	</div>
    </>
  )
}

export default Contact

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SubmitHandler, useForm, } from "react-hook-form";


interface FormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors: { name, email, message, subject },
      isSubmitting
    }
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("subject", data.subject);
      formData.append("access_key", process.env.FORM_ACCESS_KEY);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const jsonData = await response.json();
      if (jsonData.success) {
        alert("Message sent successfully");
      }
    } catch (error) {
      alert("error submitting message try after sometime");
    }
  }

  return (
    <section id="contact" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something <span className="text-indigo-500 italic">amazing</span> together</h2>
            <p className="text-neutral-400 text-lg mb-12">
              Currently open for full-time opportunities or high-impact freelance projects. 
              Drop me a line if you're interested in working with me.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-neutral-400 text-sm font-medium mb-1">Email</h4>
                  <a href="mailto:gouravmalviya445@gmail.com" className="text-xl font-semibold text-white hover:text-indigo-400 transition-colors">
                    gouravmalviya445@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-neutral-400 text-sm font-medium mb-1">Phone</h4>
                  <a href="tel:9302024030" className="text-xl font-semibold text-white hover:text-indigo-400 transition-colors">
                    +91 9302024030
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-neutral-400 text-sm font-medium mb-1">Location</h4>
                  <p className="text-xl font-semibold text-white">India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="John Doe"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required"
                      }
                    })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  {name?.message && <p className="text-sm text-red-500 mt-2">{name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required"
                      },
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  {email?.message && <p className="text-sm text-red-500 mt-2">{email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Project Collaboration"
                  {...register("subject", {
                    required: {
                      value: true,
                      message: "Subject is required"
                    }
                  })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                {subject?.message && <p className="text-sm text-red-500 mt-2">{subject.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Your Message</label>
                <textarea 
                  rows={5}
                  name="message"
                  placeholder="Tell me about your project..."
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Message is required"
                    }
                  })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                />
                {message?.message && <p className="text-sm text-red-500 mt-2">{message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 
                  <>"Send Message" <Send size={20} /></>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

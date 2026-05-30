import { useRef } from "react";
import { Easing, motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { fadeUp, staggerItem, easeOutExpo } from "../motion/variants";

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
      isSubmitting,
    },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("subject", data.subject);
      formData.append("access_key", import.meta.env.VITE_FORM_ACCESS_KEY ?? "");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const jsonData = await response.json();
      if (jsonData.success) {
        alert("Message sent successfully");
      }
    } catch (error) {
      alert("Error submitting message, please try again after sometime");
    } finally {
      reset(); // reset the form to initial state after submission
    }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "gouravmalviya445@gmail.com",
      href: "mailto:gouravmalviya445@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9302024030",
      href: "tel:9302024030",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null,
    },
  ];

  const inputClasses =
    "w-full px-4 py-3 bg-whiteSec border border-borderClr text-primary rounded-xs focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 placeholder-secondary/35 text-sm font-sans";

  return (
    <section
      id="contact"
      className="py-32 md:py-40 bg-whiteSec border-t border-borderClr"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Left Panel: Details */}
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
          >
            <motion.span
              variants={fadeUp}
              className="block font-heading font-bold text-accent text-xs uppercase tracking-widest"
            >
              05 / GET IN TOUCH
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-heading font-black text-primary uppercase mt-4 tracking-tight leading-none"
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, delay: 0.15, ease: easeOutExpo as unknown as Easing[] }}
                >
                  Let's craft
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo as unknown as Easing[] }}
                >
                  <span className="text-accent">exceptional</span> ideas
                </motion.span>
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-secondary max-w-sm mt-6 mb-12 text-sm leading-relaxed font-sans"
            >
              Currently open for full-time backend-engineering roles or
              high-impact technical consulting. Drop a message to discuss your
              design.
            </motion.p>

            <motion.div
              className="space-y-8 max-w-sm"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                },
              }}
            >
              {contactItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4 group"
                  variants={staggerItem}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xs border border-borderClr bg-bg flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-whiteSec group-hover:border-accent transition-all duration-300"
                  >
                    <item.icon size={20} />
                  </motion.div>
                  <div>
                    <h4 className="text-secondary text-2xs font-bold uppercase tracking-wider mb-0.5">
                      {item.label}
                    </h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-heading font-bold text-primary hover:text-accent transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-heading font-bold text-primary">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Panel: Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo as unknown as Easing[] }}
          >
            <div className="bg-bg border border-borderClr p-8 md:p-10 rounded-xs relative overflow-hidden">
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 h-px bg-accent"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: easeOutExpo as unknown as Easing[] }}
              />

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <label className="block text-2xs font-bold uppercase tracking-wider text-secondary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      className={inputClasses}
                    />
                    {name?.message && (
                      <p className="text-xs text-accent mt-2 font-semibold">
                        {name.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <label className="block text-2xs font-bold uppercase tracking-wider text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                      className={inputClasses}
                    />
                    {email?.message && (
                      <p className="text-xs text-accent mt-2 font-semibold">
                        {email.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <label className="block text-2xs font-bold uppercase tracking-wider text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Collaboration"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    className={inputClasses}
                  />
                  {subject?.message && (
                    <p className="text-xs text-accent mt-2 font-semibold">
                      {subject.message}
                    </p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <label className="block text-2xs font-bold uppercase tracking-wider text-secondary mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className={`${inputClasses} resize-none`}
                  />
                  {message?.message && (
                    <p className="text-xs text-accent mt-2 font-semibold">
                      {message.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full relative overflow-hidden flex items-center justify-center gap-2 bg-accent text-whiteSec py-4 rounded-xs font-bold uppercase tracking-widest text-xs transition-colors duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-accentHover translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-whiteSec relative z-10"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Send Message</span>
                      <Send size={15} />
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

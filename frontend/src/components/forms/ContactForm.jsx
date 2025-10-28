// In the handleSubmit function, replace the API call with:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  // Simulate API call
  setTimeout(() => {
    setSubmitStatus({
      type: "success",
      message: "Thank you for your message! We will get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      company: "",
      service_type: "",
      budget_range: "",
      message: "",
    });
    setIsSubmitting(false);
  }, 2000);
};

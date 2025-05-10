import { FormEvent, useEffect, useState } from "react";
import CalendarGrid, { Timeslot } from "../components/CalendarGrid";

// const sessionOptions = [
//   "Family",
//   "Senior Portrait",
//   "Couple/Engagement",
//   "Maternity",
//   "Event",
//   "Other",
// ];

export default function Contact() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [sessionOptions, setSessionOptions] = useState<string[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/api/session-types`)
      .then((res) => res.json())
      .then((sessions: string[]) => setSessionOptions(sessions));
  }, []);
  const [pricingOptions, setPricingOptions] = useState<
    {
      id: number;
      name: string;
      shortDescription: string;
      holdPrice: number;
      price: number;
    }[]
  >([]);
  useEffect(() => {
    fetch(`${API_URL}/api/pricing`)
      .then((res) => res.json())
      .then((sessions) =>
        setPricingOptions([
          ...sessions,
          {
            id: -1,
            name: "",
            shortDescription: "Other: open to negotiation",
            holdPrice: 0,
            price: 0,
          },
        ])
      )
      .catch((reason) => console.log(reason));
  }, []);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<number|null>();
  const [selectedTimeslots, setSelectedTimeslots] = useState<Timeslot[]>([]);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [agreeContact, setAgreeContact] = useState(false);
  // const [agreePolicies, setAgreePolicies] = useState(false);

  const handleSessionChange = (option: string) => {
    setSelectedSessions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handlePricingChange = (optionId: number) => {
    setSelectedPricing(optionId);
  }

  // const [showBookingPolicies, setShowBookingPolicies] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset submission states
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    // Validate required fields
    if (
      !agreeContact ||
      !fullName ||
      !email ||
      !phone ||
      selectedSessions.length === 0 ||
      !selectedPricing
    ) {
      setSubmitError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Prepare data to send
    const bookingData = {
      fullName,
      email,
      phone,
      selectedSessions,
      selectedPricing,
      location,
      message,
      referralSource,
    };

    try {
      // Replace with your actual API endpoint
      const API_ENDPOINT = `${API_URL}/api/submit-external-booking`;

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      // Handle successful submission
      setSubmitSuccess(true);

      // Optional: Reset form fields
      setFullName("");
      setEmail("");
      setPhone("");
      setSelectedSessions([]);
      setSelectedPricing(null);
      setSelectedTimeslots([]);
      setLocation("");
      setMessage("");
      setReferralSource("");
      setAgreeContact(false);

      // You might want to redirect or show a success message
      console.log("Booking submitted successfully:", data);
    } catch (error: any) {
      // Handle submission error
      setSubmitError(error.message || "Error");
      console.error("Booking submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start pt-35">
      <form
        onSubmit={handleSubmit}
        className="w-[50%] min-w-80 sm:min-w-100 max-w-150 sm:border-1 rounded-xl py-10 px-5 sm:px-20 flex flex-col gap-3 mb-10"
      >
        <h2 className="text-2xl w-full text-center">Contact Me</h2>
        <div className="flex flex-row flex-wrap items-center">
          <label className="mr-2">Full Name:</label>
          <input
            className="border-1 rounded-sm grow p-1 text-sm"
            type="text"
            required={true}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-row flex-wrap items-center">
          <label className="mr-2">Email Address:</label>
          <input
            className="border-1 rounded-sm grow p-1 text-sm"
            type="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-row flex-wrap items-center">
          <label className="mr-2">Phone Number:</label>
          <input
            className="border-1 rounded-sm grow p-1 text-sm"
            type="tel"
            required={true}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <hr className="w-[30%] mx-auto my-2" />
        <div className="flex flex-col flex-wrap items-left gap-0.5">
          <label>Session Type(s):</label>
          {sessionOptions.map((option) => (
            <div
              className="cursor-pointer select-none"
              onClick={() => handleSessionChange(option)}
              key={option}
            >
              <input
                required={
                  selectedSessions != undefined && selectedSessions.length === 0
                }
                className="mr-1"
                type="checkbox"
                checked={selectedSessions.includes(option)}
                onChange={() => {}}
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col flex-wrap items-left gap-0.5">
          <label>Package Option:</label>
          {pricingOptions.map((option) => (
            <div
              className="cursor-pointer select-none"
              onClick={() => handlePricingChange(option.id)}
              key={option.name}
            >
              <input
                required={
                  selectedSessions != undefined && selectedSessions.length === 0
                }
                className="mr-1"
                type="radio"
                checked={selectedPricing === option.id}
                onChange={() => {}}
              />
              <span>{option.shortDescription}</span>
            </div>
          ))}
        </div>
        <hr className="w-[30%] mx-auto my-2" />
        <div className="flex flex-row flex-wrap items-center">
          <label className="mr-2">Preferred Location:</label>
          <input
            className="border-1 rounded-sm grow p-1 text-sm"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-row flex-wrap items-center">
          <label className="mr-2">Message / Additional Information</label>
          <textarea
            className="border-1 rounded-sm grow p-1 text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <hr className="w-[30%] mx-auto my-2" />
        <div id="timeslot-container" className="py-2">
          <label className="mb-2">Preferred Times</label>
          <p className="text-sm pl-2 mb-2">
            Pick times from up to 3 potential dates
          </p>
          <CalendarGrid
            selectedTimeslots={selectedTimeslots}
            setSelectedTimeslots={setSelectedTimeslots}
          />
        </div>
        <hr className="w-[30%] mx-auto my-2" />
        <div className="flex flex-row flex-wrap items-center">
          <label>How did you hear about us?</label>
          <select
            className="ml-2 border-1 rounded-sm grow p-1 text-sm"
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
          >
            <option disabled={true} value="">
              Select...
            </option>
            <option value="Google">Google</option>
            <option value="Instagram">Instagram</option>
            <option value="Friend Referral">Friend Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <hr className="w-[30%] mx-auto my-2" />
        <div className="flex flex-row flex-wrap items-center">
          <label className="cursor-pointer">
            <input
              className="mr-1"
              type="checkbox"
              checked={agreeContact}
              onChange={(e) => setAgreeContact(e.target.checked)}
            />
            I agree to be contacted via email/phone regarding this booking.
          </label>
        </div>
        {/* <div className="flex flex-row flex-wrap items-center">
          <label className="cursor-pointer">
            <input
              className="mr-1"
              type="checkbox"
              checked={agreePolicies}
              onChange={(e) => setAgreePolicies(e.target.checked)}
            />
            I accept that submitting this form does not constitute a 
          </label>
        </div> */}
        <hr className="w-[30%] mx-auto my-2" />
        <div className="flex flex-col items-center">
          <button
            className="cursor-pointer rounded-md p-2 w-40 bg-mygreen-300 hover:bg-mygreen-400 transition-all duration-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {/* Error message */}
          {submitError && (
            <div className="text-red-500 mt-2">{submitError}</div>
          )}

          {/* Success message */}
          {submitSuccess && (
            <div className="text-green-500 mt-2">
              Your booking has been submitted successfully! You should receive
              an email shortly.
            </div>
          )}
        </div>
      </form>
    </main>
  );
}

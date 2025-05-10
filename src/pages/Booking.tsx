// components/BookingPage.tsx
import { useEffect, useState } from "react";
import PricingCard from "../components/PricingCard";
import CalendarGrid, {Timeslot} from "../components/CalendarGrid";

export type PricingOption = {
  id: string;
  name: string;
  description: string;
  holdPrice: number;
  price: number;
};



export type CustomDate = {
  year: number;
  month: string;
  day: number;
};

const API_URL = import.meta.env.VITE_API_URL;

function Booking() {
  const [confirmBooking, setConfirmBooking] = useState(<></>);

  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const [selectedTimeslots, setSelectedTimeslots] = useState<Timeslot[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidTimeslot = (ts: Timeslot) =>
    ts.morning || ts.afternoon || ts.evening;
  const hasPricingSelected = () => selectedOptionId != null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOptionId) {
      alert("Please select a package.");
      return;
    }

    const validTimeslots = selectedTimeslots.filter(isValidTimeslot);
    if (validTimeslots.length === 0) {
      alert("Please select at least one timeslot.");
      return;
    }

    if (!hasPricingSelected()) {
      alert("Please select a package");
      return;
    }

    const payload = {
      ...formData,
      packageId: selectedOptionId,
      timeslots: validTimeslots,
    };

    fetch(`${API_URL}/api/submit-booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          setConfirmBooking(
            <p className="w-full text-center text-green-800">
              Booking Received
            </p>
          );
        } else if (response.status === 400) {
          setConfirmBooking(
            <p className="w-full text-center text-red-600">
              Error: {data.error}
            </p>
          );
        } else {
          setConfirmBooking(
            <p className="w-full text-center text-red-600">Unexpected error</p>
          );
        }
      })
      .catch(() => {
        setConfirmBooking(
          <p className="w-full text-center text-red-600">
            Error: could not connect
          </p>
        );
      });
  };

  useEffect(() => {
    fetch(`${API_URL}/api/pricing`)
      .then((res) => res.json())
      .then((temp) => {
        console.log(temp);
        return temp;
      })
      .then((data) => setPricingOptions(data))
      .catch((err) => console.error("Error fetching pricing data:", err));
  }, []);

  return (
    <form onSubmit={handleSubmit} id="booking-form">
      <div id="package-container" className="mt-15 px-4 md:px-8 py-10">
        <h2 className="text-center text-3xl font-semibold mb-2">
          Select a Package
        </h2>
        <p className="text-center mb-12">
          Your holding fee will go towards the total price
        </p>

        <div className="flex flex-row flex-wrap justify-around mb-16">
          {pricingOptions.map((option) => (
            <PricingCard
              option={option}
              selectedOptionId={selectedOptionId}
              setSelectedOptionId={setSelectedOptionId}
            />
          ))}
        </div>

        <div id="timeslot-container" className="px-4 md:px-8 py-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Choose a Timeslot
          </h2>
          <p className="text-center mb-12">
            Pick times from up to 3 potential dates
          </p>
          <CalendarGrid
            selectedTimeslots={selectedTimeslots}
            setSelectedTimeslots={setSelectedTimeslots}
          />
        </div>
        <div id="information-container" className="px-4 md:px-8 py-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Contact Information
          </h2>
          <div className="max-w-lg mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div className="text-center pt-8">
              <button
                type="submit"
                className="bg-sky-800 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
        {confirmBooking}
      </div>
    </form>
  );
}

export default Booking;

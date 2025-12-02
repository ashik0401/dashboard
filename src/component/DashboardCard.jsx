import { useEffect, useState } from "react";

const DashboardCard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/cardData.json")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div className="p-6 grid lg:grid-cols-4 grid-cols-2 gap-6">
{cards.map((item, index) => {
  let gradient = "linear-gradient(to bottom, #9662FF, #A1DAF1)";
  if (index === 2) gradient = "linear-gradient(to bottom right, #D14CE1, #66CFFF)";
  if (index === 3) gradient = "linear-gradient(to bottom right, #2A4FC0, #7FC1C7)";


        return (
          <div
            key={item.id}
            className="bg-white  rounded-xl p-6 relative overflow-hidden flex justify-between "
          >
            <div>
              <h2 className="text-gray-600 sm:text-lg text-sm">{item.title}</h2>
              <h1 className="sm:text-3xl  font-bold">{item.bigValue}</h1>
              <p className="text-gray-800 sm:text-xl text-sm">{item.midValue}</p>
              <p className="text-green-600 sm:text-sm text-xs mt-1">{item.smallValue}</p>
            </div>
            <div
              className="sm:w-10 sm:h-10 w-6 h-6 rounded inline-flex  items-center justify-center"
              style={{
                background: gradient,
                backdropFilter: "blur(15.4px)",
              }}
            >
            <img src={item.image} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCard;

import { useEffect, useState } from "react";

const DashboardCard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/cardData.json")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
   <div className="md:flex gap-2 md:flex-wrap justify-between grid grid-cols-2">
  {cards.map((item, index) => {
    let gradient = "linear-gradient(to bottom, #cdacf8, #d6fdfd)";
    if (index === 2)
      gradient = "linear-gradient(to bottom right, #e17cec, #a1e1ff)";
    if (index === 3)
      gradient = "linear-gradient(to bottom right, #7FC1C7 ,#7c96e7 )";


        return (
          <div
            key={item.id}
            className="bg-white rounded-xl  relative overflow-hidden flex justify-between shadow-md border border-white/35 md:w-[288px] md:h-36 px-6.5 py-4.5 pb-4"
          >
            <div className="space-y-2">
              <h2 className=" font-medium sm:text-md text-sm">{item.title}</h2>
              <h1 className="sm:text-3xl  font-bold">{item.bigValue}</h1>
              <p className="text-green-600 sm:text-sm text-xs mt-1">{item.smallValue}</p>
            </div>
            <div
              className="sm:w-11.5 sm:h-11.5 w-6 h-6 rounded-md inline-flex  items-center justify-center sm:p-2 p-1 "
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

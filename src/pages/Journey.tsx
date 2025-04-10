import JourneyAssociationList from "@/components/Association/AssociationList";
import JourneyList from "@/components/Jouney/JourneyList";

const Journey = () => {
  return (
    <div className="flex container mx-auto p-4 gap-10">
      <div className="flex-1 border-solid border-gray-300 rounded-lg shadow-lg p-4 bg-white">
        <JourneyList />
      </div>
      <div className="flex-1 border-solid border-gray-300 rounded-lg shadow-lg p-4 bg-white">
        <JourneyAssociationList />
      </div>
    </div>
  );
};

export default Journey;

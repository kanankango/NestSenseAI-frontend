
interface StatCardProps {
    number: string;
    text: string;
  }
  
  const StatCard = ({ number, text }: StatCardProps) => (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transform transition-all hover:shadow-lg hover:border-[#7b68ee]/50">
      <div className="text-3xl font-bold text-[#7b68ee]">{number}</div>
      <div className="text-gray-600">{text}</div>
    </div>
  );
  
  export default StatCard;
  
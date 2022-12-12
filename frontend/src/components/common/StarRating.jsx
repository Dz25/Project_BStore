import Star from "./Star";

const StarRating = ({ selectedStars = 0 }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => (
        <Star key={index} selected={selectedStars > index} />
      ))}
    </div>
  );
};

export default StarRating;

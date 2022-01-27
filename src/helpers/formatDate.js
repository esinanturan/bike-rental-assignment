const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(dateString));
};

export default formatDate;

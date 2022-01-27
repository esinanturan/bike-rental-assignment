const hoc = (callback) => (Comp) => (props) => {
  const properties = callback(props);
  return <Comp {...properties} />;
};
export default hoc;

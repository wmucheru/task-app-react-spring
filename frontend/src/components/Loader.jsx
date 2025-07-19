const Loader = ({ isLoading = true, text = "Loading..." }) => {
  return (
    <>
      {isLoading && (
        <>
          <div className="alert alert-info">
            <span className="spinner"></span>&nbsp; &nbsp; {text}
          </div>
        </>
      )}
    </>
  );
};

export default Loader;

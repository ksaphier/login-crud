function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="spinner"></div>
        <h1 className="text-xl font-semibold text-gray-800 mt-4">Loading...</h1>
      </div>
    </div>
  );
}

export default LoadingPage;

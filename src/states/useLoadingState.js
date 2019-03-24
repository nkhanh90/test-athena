import { useState } from "react";

export default initialValue => {
  const [loading, setLoading] = useState({
    article: false,
    pagination: false
  });

  return {
    loading,
    isLoading: (loading) => {
      setLoading(loading)
    }
  };
};

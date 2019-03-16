import { useState } from "react";

export default initialValue => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    isLoading: (loading) => {
      setLoading(loading)
    }
  };
};

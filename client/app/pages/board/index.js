import React from "react";
import { useParams } from "react-router-dom";

import { Header } from "../../components/general";

function BoardPage() {
  const { slug } = useParams();
  return (
    <>
      <Header title="Board" />
      <div className="page">Board Page for {slug}</div>
    </>
  );
}

export default BoardPage;

import React from "react";
import { Progress } from "antd";
import CountTo from "react-count-to";
import Link from "next/link";

const NumberProgress = ({ number, name, link }) => {
  return (
    <Link href={"/"}>
      <a>
        <Progress
          type="circle"
          strokeColor={{
            "0%": "#aaa",
            "50%": "#1890ff",
            "100%": "#001529",
          }}
          percent={100}
          width={100}
          format={() => <CountTo to={number} speed={number * 50} />}
        />
        <p style={{ color: "maroon", marginTop: 20, fontWeight: "bold" }}>
          {name.toUpperCase()}
        </p>
      </a>
    </Link>
  );
};

export default NumberProgress;

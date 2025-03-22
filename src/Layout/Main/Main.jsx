import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Col, Flex, Row } from "antd";

import { Grid } from "antd";
const Main = () => {
  return (
    <div className=" h-[100vh] bg-[#f8f8f8]">
      <Flex vertical gap={20}>
        <Row>
          <Col span={24} className="z-10">
            <Header />
          </Col>
        </Row>
        <Row>
          <Col span={20} push={4} className="h-[100%] ">
            <Outlet />
          </Col>
          <Col span={4} pull={20} className="h-[836px] bg-white rounded-md ">
            <Sidebar />
          </Col>
        </Row>
      </Flex>
    </div>
  );
};

export default Main;

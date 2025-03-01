import React from "react";
import { Carousel } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

const contentStyle: React.CSSProperties = {
  color: "#fff",
  textAlign: "center",
  background: "#f5f5f5",
};
const CarouseExample: React.FC = () => {
  const slides = [
    {
      image: "/assets/homePage1.jpg",
    },
    {
      image: "/assets/homePage2.jpg",
    },
    {
      image: "/assets/homePage3.jpg",
    },
  ];

  return (
    <div>
      <Header
        style={{
          backgroundColor: "#e9ecef",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#1a73e8" }}>Welcome to 张威官网</h1>
      </Header>
      <Content>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          <Carousel autoplay autoplaySpeed={3000} effect="fade" arrows>
            {slides.map((slide, index) => (
              <div key={index}>
                <h3 style={contentStyle}></h3>
                <img
                  src={slide.image}
                  alt="图片"
                  style={{
                    width: "100%",
                    height: "500px",
                    //  | "contain" | "cover" | "fill" | "none" | "scale-down";
                    objectFit: "scale-down",
                    display: "block",
                    margin: "10px 0",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </Content>
    </div>
  );
};

export default CarouseExample;

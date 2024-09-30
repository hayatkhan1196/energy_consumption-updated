// import React from "react";

// const statisticalAnalysis = () => {
//   return <div>statistical analysis</div>;
// };

// export default statisticalAnalysis;

import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ApexChart from "./../../components/statisticsLightGraph/statisticsLightGraph";

function StatisticalAnalysis() {
  return (
    <>
      <Container style={{ marginLeft: "8rem" }}>
        <div
          style={{
            backgroundColor: "#000435",
            position: "fixed",
            height: "100vh",
            width: "90%",
            overflowX: "auto",
          }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              backgroundColor: "#000435",
              marginTop: "10rem",
              padding: "1rem",
            }}>
            {/* First Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>

            {/* Second Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>

            {/* Third Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              backgroundColor: "#000435",
              padding: "1rem",
            }}>
            {/* First Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>

            {/* Second Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>

            {/* Third Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              backgroundColor: "#000435",
              padding: "1rem",
            }}>
            {/* First Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>

            {/* Second Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>

            {/* Third Chart */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              backgroundColor: "#000435",
              padding: "1rem",
              marginLeft: "5rem",
            }}>
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#000450",
                margin: "0.5rem",
              }}>
              <CardContent>
                <ApexChart />
              </CardContent>
            </Card>
          </Box>
        </div>
      </Container>
    </>
  );
}

export default StatisticalAnalysis;

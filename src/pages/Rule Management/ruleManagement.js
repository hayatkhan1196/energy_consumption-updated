import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import DynamicTable from "../../components/policyTable/policyTable";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolicies } from "../../Redux/actions/PolicyData/policyData";

const RuleManagement = () => {
  const dispatch = useDispatch();
  const policies = useSelector((state) => state.policies.data);

  useEffect(() => {
    dispatch(fetchPolicies());
  }, []);

  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the data based on the search query
  const filteredData = policies.filter((row) =>
    row?.policyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePolicyForm = () => {
    history.push("/formPolicy");
  };

  return (
    <Container style={{ marginLeft: "8rem" }}>
      <div
        style={{
          backgroundColor: "#000435",
          position: "fixed",
          height: "100vh",
          width: "90%",
        }}>
        <Button
          onClick={() => handlePolicyForm()}
          variant="contained"
          size="small"
          style={{
            marginLeft: "88%",
            background:
              " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
            boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
            marginTop: "150px",
          }}>
          Create
        </Button>
        <Input
          style={{
            background:
              " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
            boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
            marginLeft: "100px",
            borderRadius: "5px",
            width: "200px",
            height: "40px",
          }}
          inputProps={{
            style: {
              color: "white",
            },
            placeholder: "Search by Policy Name",
          }}
          placeholder="Search by Policy Name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />

        <div
          style={{
            backgroundColor: "#fff",
            width: "88%",
            marginLeft: "90px",
          }}>
          {" "}
          <div variant="body1" component="div" style={{ marginTop: 50 }}>
            <DynamicTable filteredData={filteredData} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RuleManagement;

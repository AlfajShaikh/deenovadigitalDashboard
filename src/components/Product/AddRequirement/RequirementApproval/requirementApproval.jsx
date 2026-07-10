import {
  Card,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Textarea,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequirementEnquiry, updateRequirementEnquiry } from "../RequirementEnquiry/requirementEnquirySlice";

export function RequirementApproval() {
  const dispatch = useDispatch();

  const { enquiryList, loading } = useSelector(
    (state) => state.requirementEnquiry
  );

  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const [approval, setApproval] = useState({
    status: "Pending",
    approvalDate: new Date().toISOString().split("T")[0],
    digitalSignature: null,
    signedPdf: null,
    remarks: "",
  });

  useEffect(() => {
    dispatch(getAllRequirementEnquiry());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setApproval((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    if (selectedRequirement) {
      setApproval({
        status: selectedRequirement.status || "Pending",

        approvalDate:
          selectedRequirement.approvalDate
            ? selectedRequirement.approvalDate.substring(0, 10)
            : new Date().toISOString().split("T")[0],

        remarks: selectedRequirement.remarks || "",

        digitalSignature: null,
        signedPdf: null,
      });
    }
  }, [selectedRequirement]);



  const handleSaveApproval = async () => {
    const formData = new FormData();

    formData.append("customerName", selectedRequirement.customerName);
    formData.append("companyName", selectedRequirement.companyName);
    formData.append("contactPerson", selectedRequirement.contactPerson);
    formData.append("mobile", selectedRequirement.mobile);
    formData.append("email", selectedRequirement.email);
    formData.append("source", selectedRequirement.source);

    // VERY IMPORTANT
    formData.append("status", approval.status);

    formData.append(
      "requirementPoints",
      JSON.stringify(selectedRequirement.requirementPoints)
    );

    formData.append("approvalDate", approval.approvalDate);
    formData.append("remarks", approval.remarks);

    if (approval.digitalSignature) {
      formData.append("digitalSignature", approval.digitalSignature);
    }

    if (approval.signedPdf) {
      formData.append("signedPdf", approval.signedPdf);
    }

    const result = await dispatch(
      updateRequirementEnquiry({
        requirementId: selectedRequirement.requirementId,
        data: formData,
      })
    );
    console.log(result)

    if (updateRequirementEnquiry.fulfilled.match(result)) {
      setSelectedRequirement(result.payload.data);
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6">

      <Card className="shadow-lg">

        <CardBody>

          <Typography variant="h4">
            Customer Requirement Approval
          </Typography>

          <Typography color="gray" className="mb-6">
            Select a requirement and approve or reject it.
          </Typography>

          {/* Select Requirement */}

          <Select
            label="Select Requirement"
            value={selectedRequirement?.requirementId || ""}
            onChange={(value) => {
              const req = enquiryList.find(
                (item) => item.requirementId === value
              );
              setSelectedRequirement(req);
            }}
          >
            {enquiryList.map((item) => (
              <Option
                key={item._id}
                value={item.requirementId}
              >
                {item.requirementId} - {item.customerName}
              </Option>
            ))}
          </Select>

          {selectedRequirement && (
            <>

              <Card className="border mt-6">

                <CardBody>

                  <Typography variant="h6">
                    Requirement Details
                  </Typography>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">

                    <Input
                      label="Requirement ID"
                      value={selectedRequirement.requirementId}
                      disabled
                    />

                    <Input
                      label="Customer"
                      value={selectedRequirement.customerName}
                      disabled
                    />

                    <Input
                      label="Company"
                      value={selectedRequirement.companyName}
                      disabled
                    />

                    <Input
                      label="Contact Person"
                      value={selectedRequirement.contactPerson}
                      disabled
                    />

                  </div>

                </CardBody>

              </Card>

              <Card className="border mt-6">
                <CardBody>

                  <Typography variant="h6" className="mb-4">
                    Requirement Points
                  </Typography>

                  {selectedRequirement.requirementPoints &&
                    selectedRequirement.requirementPoints.length > 0 ? (

                    selectedRequirement.requirementPoints.map((point, index) => (
                      <Card
                        key={point.id}
                        className="mb-3 border bg-blue-50"
                      >
                        <CardBody>

                          <Typography>
                            <b>{index + 1}.</b> {point.point}
                          </Typography>

                          <Typography
                            variant="small"
                            color="gray"
                          >
                            {point.createdDate}
                          </Typography>

                        </CardBody>
                      </Card>
                    ))

                  ) : (

                    <Typography color="gray">
                      No Requirement Points Found
                    </Typography>

                  )}

                </CardBody>
              </Card>

              <Card className="border mt-6">

                <CardBody>

                  <Typography variant="h6" className="mb-4">
                    Customer Approval
                  </Typography>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Select
                      value={approval.status}
                      onChange={(value) => {
                        console.log(value);

                        setApproval((prev) => ({  
                          ...prev,
                          status: value,
                        }));
                      }}
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Approved">Approved</Option>
                      <Option value="Rejected">Rejected</Option>
                    </Select>

                    <Input
                      type="date"
                      label="Approval Date"
                      name="approvalDate"
                      value={approval.approvalDate}
                      onChange={handleChange}
                    />

                    <div>
                      <Typography className="mb-2">
                        Digital Signature
                      </Typography>

                      <Input
                        type="file"
                        name="digitalSignature"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Typography className="mb-2">
                        Upload Signed PDF
                      </Typography>

                      <Input
                        type="file"
                        name="signedPdf"
                        accept=".pdf"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">

                      <Textarea
                        label="Remarks"
                        name="remarks"
                        value={approval.remarks}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </CardBody>

              </Card>

              <div className="flex justify-end gap-3 mt-6">

                <Button
                  variant="outlined"
                  color="red"
                >
                  Cancel
                </Button>

                <Button
                  color="green"
                  onClick={handleSaveApproval}
                >
                  Save Approval
                </Button>

              </div>

            </>
          )}

        </CardBody>

      </Card>

    </div>
  );
}
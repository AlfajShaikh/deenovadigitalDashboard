import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { 
  PlusIcon, 
  BuildingOffice2Icon, 
  UserIcon, 
  PhoneIcon, 
  IdentificationIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getAllRequirementEnquiry } from "./AddRequirement/RequirementEnquiry/requirementEnquirySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRequirementEnquiry());
  }, [dispatch]);

  const { enquiryList = [], loading } = useSelector(
    (state) => state.requirementEnquiry
  );

  // Colorful Status Badges tailored for light/pastel backgrounds
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "approved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-emerald-100";
      case "pending":
      case "in progress":
        return "bg-orange-100 text-orange-700 border-orange-200 shadow-orange-100";
      case "rejected":
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200 shadow-rose-100";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200 shadow-blue-100";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-indigo-400 opacity-20" />
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 shadow-lg" />
        </div>
      </div>
    );
  }

  return (
    // Transparent background so it sits perfectly on your existing white page
    <div className="mx-auto max-w-7xl px-4 py-8 antialiased sm:px-6 lg:px-8 bg-transparent">
      
      {/* Animated Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <div className="inline-block rounded-full bg-indigo-50 px-3 py-1 mb-2 border border-indigo-100">
            <Typography className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Pipeline Overview
            </Typography>
          </div>
          <Typography variant="h3" className="font-black tracking-tight text-slate-800">
            Requirement Enquiries
          </Typography>
          <Typography className="text-sm font-medium text-slate-500">
            You have <span className="font-bold text-indigo-600">{enquiryList.length} active</span> enquiries in your system right now.
          </Typography>
        </div>
        
        <button
          onClick={() => navigate("/products/add-requirement")}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-300 active:translate-y-0"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <PlusIcon className="h-5 w-5 stroke-[2.5] transition-transform duration-300 group-hover:rotate-90" />
          <span>New Requirement</span>
        </button>
      </div>

      {/* Grid Content */}
      {enquiryList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-indigo-50 to-blue-50 py-24 border border-indigo-100 border-dashed">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <IdentificationIcon className="h-8 w-8 text-indigo-300" />
          </div>
          <Typography className="text-slate-600 font-semibold text-lg">No requirements found</Typography>
          <Typography className="text-slate-400 text-sm mt-1">Start by adding a new requirement to your pipeline.</Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enquiryList.map((item) => {
            return (
              <Card 
                key={item.requirementId} 
                // Colorful pastel background to stand out against pure white, with beautiful hover lift
                className="group relative overflow-hidden border border-white/60 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                {/* Decorative background shape */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200/40 to-blue-200/40 blur-2xl transition-all duration-500 group-hover:scale-150" />
                
                <CardBody className="relative p-6 flex flex-col h-full justify-between z-10">
                  
                  <div>
                    {/* Header: Title and Status */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="max-w-[70%]">
                        <Typography variant="h5" className="font-bold text-indigo-950 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                          {item.customerName}
                        </Typography>
                        <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-indigo-400/80">
                          <IdentificationIcon className="h-3.5 w-3.5" />
                          <span>ID-{item.requirementId}</span>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${getStatusConfig(item.status)}`}>
                        <span>{item.status || "New"}</span>
                      </div>
                    </div>

                    {/* Data Rows */}
                    <div className="space-y-3.5 mt-6">
                      
                      {/* Company Info */}
                      <div className="flex items-center gap-3">
                        <div className="flex p-2 bg-white/80 rounded-lg shadow-sm border border-indigo-100/50 text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                          <BuildingOffice2Icon className="h-4 w-4" />
                        </div>
                        <div className="overflow-hidden">
                          <Typography className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Company</Typography>
                          <Typography className="text-sm font-semibold text-slate-700 truncate">{item.companyName || "Not Provided"}</Typography>
                        </div>
                      </div>

                      {/* Contact Person */}
                      <div className="flex items-center gap-3">
                        <div className="flex p-2 bg-white/80 rounded-lg shadow-sm border border-indigo-100/50 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                          <UserIcon className="h-4 w-4" />
                        </div>
                        <div className="overflow-hidden">
                          <Typography className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Contact</Typography>
                          <Typography className="text-sm font-semibold text-slate-700 truncate">{item.contactPerson || "Not Provided"}</Typography>
                        </div>
                      </div>

                      {/* Mobile Phone */}
                      <div className="flex items-center gap-3">
                        <div className="flex p-2 bg-white/80 rounded-lg shadow-sm border border-indigo-100/50 text-violet-500 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                          <PhoneIcon className="h-4 w-4" />
                        </div>
                        <div className="overflow-hidden">
                          <Typography className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Mobile</Typography>
                          <Typography className="text-sm font-semibold text-slate-700 truncate">{item.mobile || "Not Provided"}</Typography>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Action Button Area */}
                  <div className="mt-8">
                    <button
                      onClick={() => navigate(`/requirement-enquiry/${item.requirementId}`)}
                      className="flex w-full items-center justify-between rounded-xl bg-white/60 backdrop-blur-md px-4 py-3 text-sm font-bold text-indigo-600 border border-white hover:bg-white hover:shadow-md transition-all duration-300 group/btn"
                    >
                      <span>View Full Details</span>
                      <div className="bg-indigo-50 p-1 rounded-md group-hover/btn:bg-indigo-600 group-hover/btn:text-white transition-colors">
                        <ArrowRightIcon className="h-4 w-4" />
                      </div>
                    </button>
                  </div>

                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
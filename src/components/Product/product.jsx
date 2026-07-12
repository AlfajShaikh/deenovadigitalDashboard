import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { 
  PlusIcon, 
  BuildingOffice2Icon, 
  UserIcon, 
  PhoneIcon, 
  IdentificationIcon,
  ArrowRightIcon,
  SparklesIcon
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

  // Vibrant, glowing status badges
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "approved":
        return "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
      case "pending":
      case "in progress":
        return "bg-orange-50 text-orange-600 border-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.2)]";
      case "rejected":
      case "cancelled":
        return "bg-rose-50 text-rose-600 border-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]";
      default:
        return "bg-blue-50 text-blue-600 border-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.2)]";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
           <div className="h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative flex h-20 w-20 items-center justify-center z-10">
          <div className="absolute h-full w-full animate-ping rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20" />
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 shadow-xl" />
        </div>
        <Typography className="mt-6 font-bold text-indigo-900 tracking-widest uppercase text-sm animate-pulse">
          Fetching Pipeline...
        </Typography>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-stagger {
            animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
        `}
      </style>

      <div className="mx-auto max-w-7xl px-4 py-10 antialiased sm:px-6 lg:px-8 relative font-sans">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>

        {/* --- Header Section --- */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md px-4 py-1.5 border border-white shadow-sm mb-2">
              <SparklesIcon className="h-4 w-4 text-amber-500" />
              <Typography className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Pipeline Overview
              </Typography>
            </div>
            <Typography 
              variant="h2" 
              className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-600 drop-shadow-sm"
            >
              Requirement Enquiries
            </Typography>
            <Typography className="text-base font-medium text-slate-500 max-w-xl">
              You are currently tracking <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{enquiryList.length} active</span> enquiries in your command center.
            </Typography>
          </div>
          
          <button
            onClick={() => navigate("/products/add-requirement")}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 text-sm font-black text-white shadow-[0_8px_30px_rgb(79,70,229,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgb(79,70,229,0.4)] active:scale-95"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <PlusIcon className="h-5 w-5 stroke-[3] transition-transform duration-500 group-hover:rotate-180" />
            <span className="tracking-wide">NEW REQUIREMENT</span>
          </button>
        </div>

        {/* --- Content Grid --- */}
        {enquiryList.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[2rem] bg-white/50 backdrop-blur-xl py-32 border border-white shadow-2xl shadow-indigo-900/5">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl animate-pulse"></div>
              <div className="relative h-20 w-20 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
                <IdentificationIcon className="h-10 w-10" />
              </div>
            </div>
            <Typography variant="h4" color="blue-gray" className="font-extrabold mb-2">Empty Pipeline</Typography>
            <Typography className="text-slate-500 font-medium">Start capturing leads by adding your first requirement.</Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            {enquiryList.map((item, index) => {
              return (
                <Card 
                  key={item.requirementId} 
                  className="group animate-stagger relative overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-blue-gray-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative Card Glow on Hover */}
                  <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-indigo-500/20" />
                  
                  <CardBody className="relative p-8 flex flex-col h-full justify-between z-10">
                    
                    <div>
                      {/* Header: Title and Status */}
                      <div className="flex items-start justify-between gap-4 mb-8">
                        <div className="max-w-[70%]">
                          <Typography variant="h5" className="font-black text-slate-800 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                            {item.customerName}
                          </Typography>
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-bold tracking-widest text-indigo-500 uppercase border border-indigo-100">
                            <IdentificationIcon className="h-3.5 w-3.5" />
                            ID-{item.requirementId}
                          </div>
                        </div>
                        
                        <div className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm ${getStatusConfig(item.status)}`}>
                          {item.status || "NEW"}
                        </div>
                      </div>

                      {/* Data Rows */}
                      <div className="space-y-5">
                        
                        {/* Company Info */}
                        <div className="flex items-center gap-4 group/row">
                          <div className="flex p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-indigo-100 text-indigo-500 group-hover/row:scale-110 group-hover/row:bg-gradient-to-br group-hover/row:from-indigo-500 group-hover/row:to-blue-600 group-hover/row:text-white transition-all duration-300">
                            <BuildingOffice2Icon className="h-5 w-5" />
                          </div>
                          <div className="overflow-hidden">
                            <Typography className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Company</Typography>
                            <Typography className="text-sm font-bold text-slate-700 truncate group-hover/row:text-indigo-600 transition-colors">{item.companyName || "Not Provided"}</Typography>
                          </div>
                        </div>

                        {/* Contact Person */}
                        <div className="flex items-center gap-4 group/row">
                          <div className="flex p-2.5 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl shadow-sm border border-purple-100 text-purple-500 group-hover/row:scale-110 group-hover/row:bg-gradient-to-br group-hover/row:from-purple-500 group-hover/row:to-fuchsia-600 group-hover/row:text-white transition-all duration-300">
                            <UserIcon className="h-5 w-5" />
                          </div>
                          <div className="overflow-hidden">
                            <Typography className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Contact</Typography>
                            <Typography className="text-sm font-bold text-slate-700 truncate group-hover/row:text-purple-600 transition-colors">{item.contactPerson || "Not Provided"}</Typography>
                          </div>
                        </div>

                        {/* Mobile Phone */}
                        <div className="flex items-center gap-4 group/row">
                          <div className="flex p-2.5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl shadow-sm border border-teal-100 text-teal-500 group-hover/row:scale-110 group-hover/row:bg-gradient-to-br group-hover/row:from-teal-500 group-hover/row:to-emerald-500 group-hover/row:text-white transition-all duration-300">
                            <PhoneIcon className="h-5 w-5" />
                          </div>
                          <div className="overflow-hidden">
                            <Typography className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Mobile</Typography>
                            <Typography className="text-sm font-bold text-slate-700 truncate group-hover/row:text-teal-600 transition-colors">{item.mobile || "Not Provided"}</Typography>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action Button Area */}
                    <div className="mt-10">
                      <button
                        onClick={() => navigate(`/requirement-enquiry/${item.requirementId}`)}
                        className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-600 border border-slate-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:border-transparent group/btn"
                      >
                        <span className="tracking-wide">View Full Profile</span>
                        <div className="bg-white p-1.5 rounded-lg shadow-sm text-indigo-600 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110">
                          <ArrowRightIcon className="h-4 w-4 stroke-[3]" />
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
    </>
  );
}
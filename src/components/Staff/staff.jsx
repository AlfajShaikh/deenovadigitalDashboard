import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Staff() {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes float-fast {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-30px, 40px) scale(1.05); }
            66% { transform: translate(20px, -20px) scale(0.95); }
          }
          .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
          .animate-float-fast { animation: float-fast 10s ease-in-out infinite; }
        `}
      </style>

      <div className="relative min-h-[calc(100vh-80px)] bg-gray-50/50 flex flex-col items-center justify-center py-12 md:py-20 px-4 overflow-hidden font-sans">
        
        {/* Floating Colorful Background Orbs */}
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[15%] w-80 h-80 bg-teal-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float-fast pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-16 text-center flex flex-col items-center">
            <Typography 
              variant="h1" 
              className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-500 drop-shadow-sm"
            >
              Staff Management
            </Typography>
            <Typography className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium">
              Streamline your workforce. Effortlessly onboard new employees or manage your existing dynamic team.
            </Typography>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 px-4 sm:px-10">

            {/* Card 1: Staff Entry */}
            <Card className="group relative bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out transform hover:-translate-y-3 rounded-[2rem] overflow-hidden">
              {/* Card Accent Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500 pointer-events-none"></div>
              
              <CardBody className="flex flex-col items-center text-center p-10 lg:p-14 relative z-10">
                {/* Icon Container */}
                <div className="mb-8 p-5 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/40 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                </div>

                <Typography variant="h3" color="blue-gray" className="font-extrabold mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  Staff Entry
                </Typography>

                <Typography className="text-gray-500 mb-10 font-medium leading-relaxed">
                  Onboard a new team member. Set up their profile, assign roles, and configure system permissions.
                </Typography>

                <Button
                  color="blue"
                  variant="gradient"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-4 rounded-xl text-sm font-black tracking-widest shadow-md hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 transition-all"
                  onClick={() => navigate("/staff/entry")}
                >
                  ADD EMPLOYEE
                </Button>
              </CardBody>
            </Card>

            {/* Card 2: Staff List */}
            <Card className="group relative bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-teal-900/5 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 ease-out transform hover:-translate-y-3 rounded-[2rem] overflow-hidden">
              {/* Card Accent Glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-colors duration-500 pointer-events-none"></div>

              <CardBody className="flex flex-col items-center text-center p-10 lg:p-14 relative z-10">
                {/* Icon Container */}
                <div className="mb-8 p-5 bg-gradient-to-br from-teal-400 to-emerald-600 text-white rounded-2xl shadow-lg shadow-teal-500/40 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>

                <Typography variant="h3" color="blue-gray" className="font-extrabold mb-3 group-hover:text-teal-600 transition-colors duration-300">
                  Staff Directory
                </Typography>

                <Typography className="text-gray-500 mb-10 font-medium leading-relaxed">
                  Browse, search, and manage your current workforce directory and edit employee details.
                </Typography>

                <Button
                  color="teal"
                  variant="gradient"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-4 rounded-xl text-sm font-black tracking-widest shadow-md hover:shadow-xl hover:shadow-teal-500/30 active:scale-95 transition-all"
                  onClick={() => navigate("/staff/list")}
                >
                  VIEW DIRECTORY
                </Button>
              </CardBody>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}
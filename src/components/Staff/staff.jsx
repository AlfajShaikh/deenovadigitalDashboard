import { Card, CardBody, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Staff() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 animate-fade-in">
      
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
          Staff Management
        </h1>
        <p className="text-lg text-gray-500 max-w-md">
          Streamline your workforce. Effortlessly onboard new employees or manage your existing team.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Card: Staff Entry */}
        <Card className="group border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 rounded-2xl overflow-hidden">
          <CardBody className="flex flex-col items-center text-center p-8 lg:p-12">
            
            {/* Icon Container */}
            <div className="mb-6 p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Staff Entry
            </h2>

            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Onboard a new team member. Set up their profile, roles, and system permissions.
            </p>

            <Button
              color="blue"
              size="lg"
              className="w-full sm:w-auto px-8 py-3 tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-transform"
              onClick={() => navigate("/staff/entry")}
            >
              Add Employee
            </Button>

          </CardBody>
        </Card>

        {/* Card: Staff List */}
        <Card className="group border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 rounded-2xl overflow-hidden">
          <CardBody className="flex flex-col items-center text-center p-8 lg:p-12">
            
            {/* Icon Container */}
            <div className="mb-6 p-4 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Staff List
            </h2>

            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Browse, search, and manage your current workforce directory and edit details.
            </p>

            <Button
              color="teal"
              size="lg"
              className="w-full sm:w-auto px-8 py-3 tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-transform"
              onClick={() => navigate("/staff/list")}
            >
              View Directory
            </Button>

          </CardBody>
        </Card>

      </div>
    </div>
  );
}
import { FiSearch, FiLayout, FiBarChart2, FiTarget, FiCpu, FiShield } from 'react-icons/fi';

const Whychoose = () => {
    return (
        <>
        <div className="min-h-[80vh] bg-[#F9FAFB]">
            <h1 className="px-4 lg:px-10 text-2xl md:text-4xl font-bold text-[#1F2937] text-center mb-2 pt-14">
                Why Choose our ATS Resume Checker
            </h1>
            <p className="px-10 md:px-0 text-sm md:text-xl text-[#6B7280] text-center mb-5">
                Join thousands of job seekers who have improved their application success rate
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 max-w-8xl gap-6 px-18 mx-auto">
                {/* box-1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB] hover:shadow-md hover:border-[#6366F1] transition-all duration-300">
                    <div className='text-xl text-[#6366F1] flex gap-3 items-center mb-3'>
                        <FiSearch size={24} />
                        <h3 className="text-[#1F2937] font-semibold">Keyword Optimization</h3>
                    </div>
                    <p className="text-[#6B7280] pb-5 lg:pb-10">
                        Our AI identifies industry-specific keywords missing from your resume and suggests optimal placement.
                    </p>
                </div>

                {/* box-2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB] hover:shadow-md hover:border-[#6366F1] transition-all duration-300">
                    <div className='text-xl text-[#6366F1] flex gap-3 items-center mb-3'>
                        <FiLayout size={24} />
                        <h3 className="text-[#1F2937] font-semibold">Format Analysis</h3>
                    </div>
                    <p className="text-[#6B7280] pb-5 lg:pb-10">
                        We check your resume's formatting to ensure it's readable by all ATS platforms without information loss.
                    </p>
                </div>

                {/* box-3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB] hover:shadow-md hover:border-[#6366F1] transition-all duration-300">
                    <div className='text-xl text-[#6366F1] flex gap-3 items-center mb-3'>
                        <FiBarChart2 size={24} />
                        <h3 className="text-[#1F2937] font-semibold">Performance Metrics</h3>
                    </div>
                    <p className="text-[#6B7280] pb-5 lg:pb-10">
                        Track your resume's improvement over time with detailed analytics and scoring metrics.
                    </p>
                </div>

                {/* box-4 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB] hover:shadow-md hover:border-[#6366F1] transition-all duration-300">
                    <div className='text-xl text-[#6366F1] flex gap-3 items-center mb-3'>
                        <FiTarget size={24} />
                        <h3 className="text-[#1F2937] font-semibold">Job-Specific Tailoring</h3>
                    </div>
                    <p className="text-[#6B7280] pb-5 lg:pb-10">
                        Customize your resume for specific job descriptions to maximize your match percentage.
                    </p>
                </div>

                {/* box-5 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB] hover:shadow-md hover:border-[#6366F1] transition-all duration-300">
                    <div className='text-xl text-[#6366F1] flex gap-3 items-center mb-3'>
                        <FiCpu size={24} />
                        <h3 className="text-[#1F2937] font-semibold">AI-Powered Suggestions</h3>
                    </div>
                    <p className="text-[#6B7280] pb-5 lg:pb-10">
                        Get intelligent content recommendations to strengthen your professional narrative.
                    </p>
                </div>

                {/* box-6 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB] hover:shadow-md hover:border-[#6366F1] transition-all duration-300">
                    <div className='text-xl text-[#6366F1] flex gap-3 items-center mb-3'>
                        <FiShield size={24} />
                        <h3 className="text-[#1F2937] font-semibold">Privacy Protection</h3>
                    </div>
                    <p className="text-[#6B7280] pb-5 lg:pb-10">
                        Your resume data is encrypted and never shared with third parties or potential employers.
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Whychoose
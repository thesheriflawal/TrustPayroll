export function HowItWorks() {
    return (
        <section className="min-h-[95vh] flex items-center justify-center py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-[#112a45] mb-12 pl-4">How it works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Step 1 */}
                    <div className="bg-white rounded-3xl aspect-[3/4] p-8 flex flex-col justify-end shadow-sm">
                        <p className="text-[#112a45] font-medium text-center">Connect your wallets and bank account</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-3xl aspect-[3/4] p-8 flex flex-col justify-end shadow-sm">
                        {/* Content based on mockup or placeholder */}
                        <div className="h-full w-full bg-gray-50 rounded-xl mb-4"></div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-3xl aspect-[3/4] p-8 flex flex-col justify-end shadow-sm">
                        {/* Content based on mockup or placeholder */}
                        <div className="h-full w-full bg-gray-50 rounded-xl mb-4"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RentersGuide = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border">
                {/* Header - Always Visible */}
                <div
                    className="p-6 md:p-8 bg-secondary/5 cursor-pointer flex items-center justify-between hover:bg-secondary/10 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                            <Icon name="BookOpen" size={24} color="#E16733" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">Renters Guide & FAQ</h2>
                            <p className="text-muted-foreground hidden md:block">Everything you need to know about budgeting for your next home.</p>
                        </div>
                    </div>
                    <Icon
                        name={isExpanded ? "ChevronUp" : "ChevronDown"}
                        size={24}
                        className="text-muted-foreground transition-transform duration-300"
                    />
                </div>

                {/* Content - Collapsible */}
                <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <article className="p-8 md:p-12 max-w-5xl mx-auto">
                        {/* Main Title */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-[#3D2817] text-center leading-tight mb-6">
                            How Much Rent Can I Afford?
                        </h1>

                        <div className="max-w-4xl mx-auto">
                            {/* Introduction */}
                            <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                One in three American renters overspends on housing every month. That creates financial stress you don't need.
                            </p>

                            <p className="text-base text-[#4A4A4A] leading-relaxed mb-12">
                                Use the Rent with Clara calculator above to get your number in 30 seconds. Then read this to make sure you're not missing hidden costs that blow your budget.
                            </p>

                            {/* The 30% Rule Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    The 30% Rule (Your Starting Point)
                                </h2>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Take your gross monthly income. Multiply by 0.30. That's your rent ceiling.
                                </p>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Quick Reference:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li><span className="font-bold text-[#E8734E]">$3,000/month</span> → $900 max rent</li>
                                    <li><span className="font-bold text-[#E8734E]">$4,500/month</span> → $1,350 max rent</li>
                                    <li><span className="font-bold text-[#E8734E]">$6,000/month</span> → $1,800 max rent</li>
                                    <li><span className="font-bold text-[#E8734E]">$8,000/month</span> → $2,400 max rent</li>
                                </ul>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Landlords use this rule during applications. Most require you earn 3x the monthly rent.
                                </p>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    When to adjust:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>High debt load? Drop to 25%</li>
                                    <li>High cost of living city? You might need 35-40%</li>
                                    <li>Saving for a house? Stay under 25%</li>
                                    <li>Freelance income? Use your lowest month, not your best</li>
                                </ul>
                            </section>

                            {/* The 50/30/20 Split Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    The 50/30/20 Split
                                </h2>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    After taxes, divide your income:
                                </p>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li><span className="font-bold">50% = Needs</span> (rent, utilities, food, insurance, debt minimums)</li>
                                    <li><span className="font-bold">30% = Wants</span> (dining, entertainment, hobbies)</li>
                                    <li><span className="font-bold">20% = Savings</span> (emergency fund, retirement, extra debt payments)</li>
                                </ul>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Your rent must fit inside that 50% bucket with room for everything else.
                                </p>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    In expensive markets, shift to 60/30/10.
                                </p>
                            </section>

                            {/* Hidden Costs Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    Hidden Costs That Kill Budgets
                                </h2>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Upfront (Before You Move In):
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Security deposit: 1 month's rent</li>
                                    <li>First month's rent</li>
                                    <li>Application fees: $25-$75 per place</li>
                                    <li>Pet deposits: $200-$500</li>
                                    <li>Moving costs: $200-$2,000</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Monthly (On Top of Rent):
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Utilities: $100-$250</li>
                                    <li>Internet: $50-$150</li>
                                    <li>Renter's insurance: $15-$40</li>
                                    <li>Parking: $50-$300 (urban areas)</li>
                                </ul>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Add these to your rent. That's your real housing cost.
                                </p>
                            </section>

                            {/* Location Math Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    Location Math
                                </h2>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    City center apartments:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Higher rent</li>
                                    <li>Lower transportation costs</li>
                                    <li>Walk/bike/transit replaces car expenses</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Suburban rentals:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Lower rent</li>
                                    <li>Need a car (gas, insurance, maintenance)</li>
                                    <li>Longer commutes = time cost</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Rural properties:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Lowest rent</li>
                                    <li>Highest transportation needs</li>
                                    <li>Limited services nearby</li>
                                </ul>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Calculate total cost, not just rent.
                                </p>
                            </section>

                            {/* Size and Quality Trade-offs Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    Size and Quality Trade-offs
                                </h2>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Unit Size:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li><span className="font-semibold">Studio:</span> Most affordable, works for 1-2 people in tight quarters</li>
                                    <li><span className="font-semibold">1-bedroom:</span> Privacy between living and sleeping</li>
                                    <li><span className="font-semibold">2-bedroom:</span> Roommate cost split or home office space</li>
                                    <li><span className="font-semibold">3+ bedrooms:</span> Families or multiple roommates</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Building Age:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li><span className="font-semibold">Newer</span> = higher rent, lower utilities, fewer repairs</li>
                                    <li><span className="font-semibold">Older</span> = lower rent, higher utilities, occasional issues</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Amenities That Pay Off:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>In-unit laundry (saves $40-$80/month vs. laundromat)</li>
                                    <li>Gym (saves $30-$100/month membership)</li>
                                    <li>Included parking (saves $50-$300/month)</li>
                                </ul>
                            </section>

                            {/* How to Pay Less Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    How to Pay Less
                                </h2>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Negotiate:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Offer longer lease (18-24 months) for lower rate</li>
                                    <li>Pay several months upfront for discount</li>
                                    <li>Flexible move-in date for better price</li>
                                    <li>Trade maintenance work for rent reduction</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Timing:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Search November-February (fewer renters = better deals)</li>
                                    <li>Mid-month availability (less competition)</li>
                                    <li>New construction areas (buildings compete for tenants)</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Roommates:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li><span className="font-bold text-[#E8734E]">$2,000 two-bedroom split = $1,000 each</span></li>
                                    <li>Often cheaper than a studio in the same area</li>
                                    <li>Screen carefully before signing together</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Expand Your Search:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Look 10 minutes farther out (save $200-$400/month)</li>
                                    <li>Check up-and-coming neighborhoods before they're trendy</li>
                                    <li>Consider basement apartments or ADUs</li>
                                </ul>
                            </section>

                            {/* Protect Your Money Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    Protect Your Money
                                </h2>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    Before Signing:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Read every lease clause</li>
                                    <li>Photograph unit condition (walls, floors, appliances)</li>
                                    <li>Get landlord promises in writing</li>
                                    <li>Understand rent increase policies</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mt-6 mb-4">
                                    After Moving In:
                                </h3>

                                <ul className="list-disc pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li>Set up autopay (never miss rent)</li>
                                    <li>Report issues fast but reasonably</li>
                                    <li>Keep all payment records</li>
                                    <li>Maintain the property</li>
                                </ul>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Good tenants get smaller rent increases and faster repairs.
                                </p>
                            </section>

                            {/* Your Action Plan Section */}
                            <section className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    Your Action Plan
                                </h2>

                                <ol className="list-decimal pl-6 mb-4 text-base text-[#4A4A4A] leading-relaxed space-y-2">
                                    <li><span className="font-bold text-[#E8734E]">Use the Rent with Clara calculator above</span> for your personalized range</li>
                                    <li><span className="font-bold text-[#E8734E]">Add 20% for utilities and hidden costs</span></li>
                                    <li><span className="font-bold text-[#E8734E]">List your must-haves</span> (location, size, pet policy)</li>
                                    <li><span className="font-bold text-[#E8734E]">Search within your calculated ceiling</span></li>
                                    <li><span className="font-bold text-[#E8734E]">Visit properties at different times</span> (rush hour, evening, weekend)</li>
                                    <li><span className="font-bold text-[#E8734E]">Read lease carefully</span></li>
                                    <li><span className="font-bold text-[#E8734E]">Document everything at move-in</span></li>
                                </ol>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Your rent should fit your budget without stress. If you're constantly worried about making the payment, you're spending too much.
                                </p>

                                <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
                                    Find a place that works today and supports where you're going tomorrow.
                                </p>
                            </section>

                            {/* FAQ Section */}
                            <section className="mt-12 mb-8">
                                <h2 className="text-2xl font-bold text-[#3D2817] leading-snug mt-12 mb-5">
                                    FAQ
                                </h2>

                                <div className="space-y-6">
                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5 first:border-t-0 first:pt-0 first:mt-0">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            What is the 30% rule?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Spend no more than 30% of gross monthly income on rent. Keeps other expenses manageable.
                                        </p>
                                    </div>

                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            How do I calculate affordable rent?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Gross monthly income × 0.30 = baseline rent budget. Adjust based on debt and goals.
                                        </p>
                                    </div>

                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            What costs beyond rent should I budget?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Utilities ($100-$250), internet ($50-$150), renter's insurance ($15-$40), parking (varies). Add $150-$400 monthly.
                                        </p>
                                    </div>

                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            Can I negotiate rent?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Yes. Research comparable units, highlight stable income, offer longer lease or upfront payments.
                                        </p>
                                    </div>

                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            How can I lower rental costs?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Get a roommate, search farther from downtown, choose smaller units, time your search for winter months.
                                        </p>
                                    </div>

                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            Why get renter's insurance?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Protects your belongings and provides liability coverage. Costs $15-$40/month. Landlord's policy doesn't cover your stuff.
                                        </p>
                                    </div>

                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            Should I pay more for better location?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Calculate total costs. Higher rent near work might save on car, gas, and commute time. Run the full numbers.
                                        </p>
                                    </div>

                                    <div className="border-t border-[#E5D9CC] pt-5 mt-5">
                                        <h3 className="text-lg font-semibold text-[#5C4A3A] leading-snug mb-4">
                                            What if 30% doesn't work in my city?
                                        </h3>
                                        <p className="text-base text-[#4A4A4A] leading-relaxed">
                                            Get a roommate, move farther out, or increase income with side work. High-cost cities require creative solutions.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default RentersGuide;

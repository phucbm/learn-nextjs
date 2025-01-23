import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {BadgeDollarSign, Clock, Inbox, Users} from 'lucide-react';
import {lusitana} from '@/app/ui/fonts';
import {fetchCardData} from "@/app/lib/data";

const iconMap = {
    collected: BadgeDollarSign,
    customers: Users,
    pending: Clock,
    invoices: Inbox,
};

export default async function CardWrapper() {
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    return (
        <>
            <MetricCard title="Collected" value={totalPaidInvoices} type="collected"/>
            <MetricCard title="Pending" value={totalPendingInvoices} type="pending"/>
            <MetricCard title="Total Invoices" value={numberOfInvoices} type="invoices"/>
            <MetricCard
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
            />
        </>
    );
}

function MetricCard({
                        title,
                        value,
                        type,
                    }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
    const Icon = iconMap[type];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                {Icon && <Icon className="h-5 w-5 text-gray-700"/>}
                <CardTitle className="ml-2 text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className={`${lusitana.className} text-2xl text-center py-6`}>
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}
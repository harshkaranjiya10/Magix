import { getFees } from "@/app/actions/getFees"
import { columns } from "@/components/athlete-list-fees/column"
import { DataTable } from "@/components/athlete-list-fees/data-table"
import FeesForm from "./fees-form";

export default async function AthleteListFees(
  params: { id: string }
) {
  const fees = JSON.parse(await getFees(params.id))
  const data = fees;
  return (
    <div>
      <FeesForm athleteId={params.id} />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

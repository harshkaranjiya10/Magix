import { columns } from "@/components/athlete-list/column"
import { DataTable } from "@/components/athlete-list/data-table"

import { getUsers } from "@/lib/db/getUsers"

export default async function AthleteList() {
  const data = JSON.parse(JSON.stringify(await getUsers()))

  //console.log(data)

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

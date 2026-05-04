import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AthleteList() {

    const users = [
        { _id: 1, name: 'Alice', mobile : '9999999999', workout: 'Pull', attendance: 'Present' },
        { _id: 2, name: 'Bob', mobile : '9999999999', workout: 'Push', attendance: '' }, 
        { _id: 3, name: 'Charlie', mobile : '9999999999', workout: 'Legs', attendance: '' },
        { _id: 4, name: 'David', mobile : '9999999999', workout: 'Core', attendance: '' },
    ]

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Workout</TableHead>
                    <TableHead className="text-right">Atttend</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.mobile}</TableCell>
                        <TableCell>{user.attendance ? user.workout : ''}</TableCell>
                        <TableCell className="text-right">{user.attendance === 'Present' ? '✅' : ''}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total Athlete</TableCell>
                    <TableCell className="text-right">39</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
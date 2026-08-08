
interface props {
    children:React.ReactNode
}
const AppWrapper = ({children}:props) => {
  return (
    <div className="h-full">
        <main className="h-full">
            {children}
        </main>
    </div>
  )
}

export default AppWrapper
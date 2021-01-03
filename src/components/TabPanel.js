export default function TabPanel(props) {
    const { value, index, children } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
        >
            {value === index && children}
        </div>
    )
}

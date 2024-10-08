import { Tabs, Tab } from "@nextui-org/tabs";

export default function TapsComponent({ onTabChange }) {

    const handleTabChange = (key) => {
        if (onTabChange) {
            onTabChange(key);
        }
    };

    return (
        <Tabs aria-label="Crud" onSelectionChange={handleTabChange} className="bg-[#3C526F] text-white rounded-md">
            <Tab key="01" title="Beneficiarios" className="bg-[#3C526F] text-white p-2 rounded-md">
            </Tab>
            <Tab key="02" title="Chalecos" className="bg-[#3C526F] text-white p-2 rounded-md">
            </Tab>
            <Tab key="03" title="Usuarios" className="bg-[#3C526F] text-white p-2 rounded-md">
            </Tab>
        </Tabs>
    );
}
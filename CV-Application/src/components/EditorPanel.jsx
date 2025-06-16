import React from "react";
import { useState } from "react";
import AccordianItem from "./accordianitem.jsx"
import TextInput from "./textinput.jsx"
import NestedItems from "./nesteditems.jsx"
import SkillItems from "./skillitems.jsx"

export default function EditorPanel({ headerData, onHeaderChange, experienceData, projectData, skillData, onItemDelete, onItemChange, onItemAdd}) {
    const [activeIndex, setActiveIndex] = useState(null);

    function handleToggle(idex) {
        setActiveIndex(idex === activeIndex ? null : idex)
    }

    const accordianItems = [
        {
            title : "header",
            className : "accordian-grid",
            content : headerData.map((f, idx) => 
            <TextInput
                key={idx}
                id={idx}
                label={f.label}
                value={f.label}
                required={f.required}
                onType={(e) => onHeaderChange(e, idx)}
            />
            )
        },
        {
            title: "Experience",
            className: "",
            content: 
                <NestedItems
                    itemsData={experienceData}
                    onItemDelete={(toDeleteId) => onItemDelete("experience", toDeleteId)}
                    onItemChange={(e, id, field) => onItemChange("experience", e, id, field)}
                    onItemAdd={(parentId, itemLevel) => onItemAdd("experience", parentId, itemLevel)}
                    itemName={"Experience"}
                    subItemName={"Detail"}
                />
        },
        {
            title: "Projects",
            className: "",
            content: 
                <NestedItems
                    itemsData={projectData}
                    onItemDelete={(toDeleteId) => onItemDelete("project", toDeleteId)}
                    onItemChange={(e, id, field) => onItemChange("project", e, id, field)}
                    onItemAdd={(parentId, itemLevel) => onItemAdd("project", parentId, itemLevel)}
                    itemName={"Project"}
                    subItemName={"Detail"}
                />
        },
        {
            title: "Skills",
            className: "",
            content: 
                <SkillItems 
                    skillData={skillData}
                    onItemDelete={(toDeleteId) => onItemDelete("skill", toDeleteId)}
                    onItemChange={(e, id, field) => onItemChange("skill", e, id, field)}
                    onItemAdd={(parentId, itemLevel) => onItemAdd("skill", parentId, itemLevel)}
                />
        },
    ]

    return (
        <aside className="panel editor-panel">
          <div className="accordian">
            {accordianItems.map((item, idex) => (
              <AccordianItem
                key={idex}
                title={item.title}
                className={item.className}
                isActive={activeIndex === idex}
                onToggle={() => handleToggle(idex)}
              >
                {item.content}
              </AccordianItem>
            ))}
          </div>
        </aside>
      );      
}
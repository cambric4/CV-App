import React from "react";

export default function CV({ headerData, experienceData, projectData, skillData}) {
    const firstName = headerData[0].value;
    const lastName = headerData[1].value;
    const email = headerData[2].value;
    const number = headerData[3].value;
    const location = headerData[4].value;

    return (
        <div className="cv">
            <section className="cv_header cv_section">
                <h1>{firstName} {lastName}</h1>
                <p>{email} | {number} | {location}</p>
            </section>
            <section className="cv_experience cv_section">
                <h1>Experience</h1>
                <hr />
                <Items data={experienceData}/>
            </section>
            <section className="cv_projects cv_section">
                <h1>Projects</h1>
                <hr />
                <Items data={projectData}/>
            </section>
            <section className="cv_skills cv_section">
                <h1>Skills</h1>
                <hr />
                <Items data={skillData}/>
            </section>
        </div>
    )
}

function Items({ data }) {
    return data[0].childIds?.map(itemId => {
        const item = data[itemId];
        return (
            <div className="cv_inner-section" key={itemId}>
                <div className="cv_inner-header row">
                    <p className="cv_inner-title"><strong>{item.title}</strong></p>
                    <p className="cv_inner-date">
                        <strong>
                            {(() => {
                            const start = item.startDate || "";
                            const end = item.present ? "Present" : item.endDate || "";
                                if (!start && !end) return ""; // no dates at all
                                return start + (end ? ` - ${end}` : "");
                            })()}
                        </strong>
                    </p>

                </div>
                <div className="cv_inner-desc row">
                    <p className="cv_inner-title">{item.role}</p>
                    <p className="cv_inner-date">{item.location}</p>
                </div>
                <ul className="cv_outer-list">
                    {item.childIds.map(subItemId => {
                        const subItem = data[subItemId];
                        return (
                            <li key={subItemId}>
                                {subItem.content}
                                <ul className="cv_inner-list">
                                    {subItem.childIds.map(descId => {
                                        const desc = data[descId];
                                        return (
                                            <li key={descId}>
                                                {desc.content}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })};
                </ul>
            </div>
        )
    });
}

function Skills({ data }) {
    const rootChildren = data[0]?.childIds || [];

    return (
        <ul className="cv_outer-list">
            {rootChildren.map((categoryId) => {
                const category = data[categoryId];
                const items = category.childIds.map(id => data[id].content).filter(Boolean);

                if (!category.category?.trim() && items.length === 0) return null;

                return (
                    <li key={categoryId}>
                        <strong>{category.category}</strong>: {items.join(',')}
                    </li>
                );
            })}
        </ul>
    );
}
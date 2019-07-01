 import React from 'react';

 export function DisplayResourceLinks(props){
        const resource_links = props.resource_links;

        if (resource_links){

            if (resource_links.length){
                let buffer = [];
                buffer.push(<h3>Resource Links</h3>);
                for (var l in resource_links){
                    let new_resource = (
                        <p>
                            <a href={resource_links[l]['href']}  target="_blank">{resource_links[l]['hyperlink_name']}
                                </a>
                            <br/>
                            <span class="offset">{resource_links[l].description}</span>
                        </p>
                     )
                    buffer.push(<hr/>);
                    buffer.push(new_resource);
                 }
                return <div>{buffer}</div>
            }
            else{
                return <p/>;
            }
        }
        else{
            return <p/>;
        }
    }

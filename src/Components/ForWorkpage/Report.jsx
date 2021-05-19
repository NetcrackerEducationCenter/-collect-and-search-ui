import React from 'react';
import { Container, OverlayTrigger, Popover } from 'react-bootstrap';
import { Button, Descriptions, Empty, Tag } from 'antd';

function Report(props) {
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([props.report.dataModels.map(v => { return v.text + '\n' })],
            { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = `Report_${props.report.requestId}.txt`;
        document.body.appendChild(element);
        element.click();
    }

    const renderStatus = () => {
        if (props.report.status === 'COMPLETED') {
            return (
                <Tag color="#87d068">COMPLETED</Tag>
            );
        } else if (props.report.status === 'RESTORED') {
            return (
                <Tag color="#108ee9">RESTORED</Tag>
            );
        } else {
            return (
                <Tag color="#c2be4a">IN PROGRESS</Tag>
            );
        }
    }
    const getReportDescription = () => {
        return (
            <Descriptions bordered style={{
                fontFamily: 'Comfortaa, cursive'
            }}>
                <Descriptions.Item label="Status" span={1}>
                    {renderStatus()}
                </Descriptions.Item>
                <Descriptions.Item label="Created date" span={2}>{props.report.date}</Descriptions.Item>
                <Descriptions.Item label="Keywords" span={3}>{props.report.keywords.map(v => { return ' ' + v })}</Descriptions.Item>
                <Descriptions.Item label="Sources" span={3}>{props.report.sources.map(v=>{return <><br />{v}</>})}</Descriptions.Item>
            </Descriptions>
        );
    }

    let simpleReport = {
        dataModels: [
            {
                dataSource: 'http://localhost:7070/workpage',
                text: 'Являясь всего лишь частью общей картины, элементы политического процесса лишь добавляют фракционных разногласий и призваны к ответу. Господа, постоянный количественный рост и сфера нашей активности говорит о возможностях новых принципов формирования материально-технической и кадровой базы. Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение системы массового участия.'
            },
            {
                dataSource: 'http://netcracker-collect-and-search.tk:7070/',
                text: 'Предварительные выводы неутешительны: высококачественный прототип будущего проекта прекрасно подходит для реализации поставленных обществом задач. И нет сомнений, что диаграммы связей представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть объединены в целые кластеры себе подобных!'
            },
            {
                dataSource: '206.81.22.187',
                text: 'Господа, реализация намеченных плановых заданий требует анализа новых предложений. Консультация с широким активом создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса новых предложений. Как принято считать, представители современных социальных резервов будут ассоциативно распределены по отраслям. В своём стремлении повысить качество жизни, они забывают, что укрепление и развитие внутренней структуры не даёт нам иного выбора, кроме определения кластеризации усилий. Противоположная точка зрения подразумевает, что ключевые особенности структуры проекта неоднозначны и будут объединены в целые кластеры себе подобных.'
            },
            {
                dataSource: 'https://netcracker-collect-and-search.tk:8443/auth/',
                text: 'Также как экономическая повестка сегодняшнего дня не оставляет шанса для направлений прогрессивного развития. Предварительные выводы неутешительны: дальнейшее развитие различных форм деятельности способствует подготовке и реализации дальнейших направлений развития. Безусловно, повышение уровня гражданского сознания является качественно новой ступенью укрепления моральных ценностей. С учётом сложившейся международной обстановки, современная методология разработки прекрасно подходит для реализации системы обучения кадров, соответствующей насущным потребностям. С другой стороны, высококачественный прототип будущего проекта влечет за собой процесс внедрения и модернизации экономической целесообразности принимаемых решений.'
            }
        ]
    }
    // if (props.report && Array.isArray(props.report.dataModels) && props.report.dataModels.length === 0) {
    console.log('Show report:' + JSON.stringify(props.report));
    return (
        <Container fluid>
            <br />
            {getReportDescription()}
            {props.report.dataModels.map((v, i) => {
                return (
                    <>
                        <br />
                        <br />
                        <OverlayTrigger
                            trigger="click"
                            key={i}
                            placement='top'
                            overlay={
                                <Popover id={i}>
                                    <Popover.Title as="h3">Found in</Popover.Title>
                                    <Popover.Content>
                                        <a href={v.dataSource}>
                                            {v.dataSource}
                                        </a>
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <p>
                                {v.text}
                            </p>

                        </OverlayTrigger>
                    </>
                );
            })}
            <br />
            <br />
            <Button type='primary' size='large' ghost onClick={downloadTxtFile} >Download text</Button>
        </Container >
    );
}

export default Report;
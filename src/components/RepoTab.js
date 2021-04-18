import { Card } from 'react-bootstrap';
const RepoTab = ({ repos }) => {
    return (
        <div>
            {
                repos.map((r) => {

                    return (
                        <Card class="border mb-2">
                            <Card.Body>
                                <Card.Title>
                                    <a href={r.full_name}>{r.full_name}</a>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"> {r.description}</Card.Subtitle>
                                <Card.Text>

                                </Card.Text>
                                <Card.Link href="#">Star: {r.stargazers_count} {r.language} Updated {r.updated_at}</Card.Link>

                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default RepoTab
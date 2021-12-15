import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDistance } from 'date-fns';
export const Tweet = ({
	content = '',
	location = '',
	likes = 0,
	user = {},
	createdAt = '',
}) => {
	return (
		<Card className={'mb-4'}>
			<Card.Body>
				<Card.Title>@{user?.username}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					{createdAt
						? formatDistance(new Date(), new Date(createdAt), {
								includeSeconds: true,
						  })
						: ''}
				</Card.Subtitle>
				<Card.Text>{content}</Card.Text>
				<Card.Link href="#">{likes} likes</Card.Link>
			</Card.Body>
		</Card>
	);
};

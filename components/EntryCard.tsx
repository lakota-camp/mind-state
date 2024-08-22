'use client';

import formateDateTime from '@/utils/formatDate';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from './ui/button';

// ? Add a AI generated summary to each entry card
// !FIXME: Add a delete button for each entry card

const EntryCard = ({ entry, analysis }) => {
  const { createdAt, content } = entry;
  console.log(analysis);

  // Map analysis data to entry
  const correspondingAnalysis = analysis.find((a) => a.entryId === entry.id);

  // Create and format date for entry
  const dateTime = formateDateTime(new Date(createdAt));

  return (
    <>
      <Card className={`h-full hover:bg-zinc-50`}>
        <CardHeader>
          <CardTitle>{dateTime}</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div>
            <span className="font-semibold">Summary: </span>
            {correspondingAnalysis?.summary}
          </div>
          <div className="mt-5">
            <span className="font-semibold">Mood: </span>
            {correspondingAnalysis?.mood}
          </div>
          <div className="mt-5">
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="link">Full Entry</Button>
              </HoverCardTrigger>
              <HoverCardContent>{content}</HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EntryCard;

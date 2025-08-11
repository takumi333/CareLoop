import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import React, { useState } from 'react'

const NotificationBell = () => {
  const [open, setOpen] = useState(false);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        この中にスクロールコンテンツ設置
      </PopoverContent>
    </Popover>
  )
}

export default NotificationBell
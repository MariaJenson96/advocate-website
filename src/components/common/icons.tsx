import {
  Briefcase, Compass, FilePen, Gavel, Handshake, Landmark, Lock, MessagesSquare, Scale, ShieldCheck, Target, Users,
  type LucideIcon,
} from 'lucide-react'
import type { PracticeIcon } from '@/data/practice-areas'
import type { ApproachIcon } from '@/data/approach'

export const practiceIcons: Record<PracticeIcon, LucideIcon> = {
  scale: Scale, gavel: Gavel, users: Users, landmark: Landmark, briefcase: Briefcase,
  shield: ShieldCheck, 'file-pen': FilePen, messages: MessagesSquare,
}

export const approachIcons: Record<ApproachIcon, LucideIcon> = {
  compass: Compass, messages: MessagesSquare, scale: Scale, target: Target, lock: Lock, handshake: Handshake,
}

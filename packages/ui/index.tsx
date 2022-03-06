import * as React from "react";

export * from "./Test";
export * from "./CardTest";

// Lists
export * from "./Lists/ArtistList";
export * from "./Lists/PlaylistList";
export * from "./Lists/TrackList";

// Cards
export * from "./Cards/ArtistCard";
export * from "./Cards/PlaylistCard";
export * from "./Cards/TrackCard";

// Screens
export * from "./Screens/ArtistScreen";
export * from "./Screens/PlaylistScreen";

// Buttons
export * from "./Buttons/SSO/SpotifySSO";

// Widget
export * from "./Widgets/PlaylistWidget";

export type ServiceProvider = "spotify" | "google" | "apple" | "deezer";
export type onClick = (value: any) => void;

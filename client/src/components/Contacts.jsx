import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";


export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [matchedContact, setMatchedContact] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    async function fun() {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
      }
    }
    fun();
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(matchedContact);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Find the contact with the matching username
    const foundContact = contacts.find(
      (contact) => contact.username.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundContact) {
      // Open the chat for the found contact
      const contactIndex = contacts.findIndex((contact) => contact === foundContact);
      setMatchedContact(foundContact);
      setCurrentSelected(contactIndex);
      setUserNotFound(false);

    } else {
      // Username not found
      setMatchedContact(null);
      setCurrentSelected(undefined);
      setUserNotFound(true);
    }
    localStorage.setItem("currentUser", JSON.stringify(foundContact));

    
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Namaste</h3>
          </div>

          <Container2>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by username"
              />
            </form>
          </Container2>

          <div className="contacts">
            {userNotFound ? (
              <p>No user found with the given username.</p>
            ) : (
              matchedContact && (
                <div
                  key={matchedContact._id}
                  className={`contact ${matchedContact === currentSelected ? "selected" : ""}`}
                  onClick={() => changeCurrentChat(matchedContact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${matchedContact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{matchedContact.username}</h3>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 11% 63% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .searchContact{
    height: 60px; 
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

const Container2 = styled.div`
  height: 60px;
  background-color: #9a86f3;
  width: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
  }
  input {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    &::selection {
      background-color: #9a86f3;
    }
    &:focus {
      outline: none;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
`;


/* 
{
                    contacts.map((contact, index) => {
                   return (
                    <div
                      key={contact._id}
                      className={`contact ${index === currentSelected ? "selected" : ""
                        }`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatar"
                        />
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  );
                }
                )}

*/
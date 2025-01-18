package com.globits.hr.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globits.hr.domain.PersonCertificate;

@Repository
public interface PersonCertificateRepository extends JpaRepository<PersonCertificate, UUID> {

}
